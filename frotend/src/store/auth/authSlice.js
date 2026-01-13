import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../../util/cookieUtil";
import { login, register } from "../../api/authApi";

const initState = {
  isLoggedIn: false,
  accessToken: null,
  memberRole: null,
  error: null,
  isLoading: false,
  loginId: null,
};
//쿠키에서 멤버 정보 로딩
const loadMemberCookie = () => {
  const memberInfo = getCookie("member");
  if (!memberInfo) return initState;
  return { ...initState, ...memberInfo, isLoggedIn: true };
};
//로그인 Thunk
export const loginAsync = createAsyncThunk(
  "auth/loginAsync", //이 Thunk 의 이름
  async (loginInfo, { rejectWithValue }) => {
    try {
      //loginInfo 는 아이디와 패스워드가 담긴 객체
      const data = await login(loginInfo.id, loginInfo.password);
      //백엔드에 아이디와 패스워드 전송 후 토큰을 받음 = data
      return data;
      //return 할때 redux가 다음과 같은 객체를 자동 생성 { type: 'auth/loginAsync/fulfilled', payload: data }
    } catch (error) {
      return rejectWithValue(error.response.data); //로그인 실패 시 에러 반환(payload)
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/registerAsync",
  async (memberInfo, { rejectWithValue }) => {
    try {
      //회원가입 시 입력된 정보가 memberInfo 에 객체 형태로 담김
      const data = await register(memberInfo);
      //입력된 회원정보 바탕으로 신규회원 등록
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//슬라이스 생성
const authSlice = createSlice({
  //createSlice 로 생성되면 useSelector 를 통해 상태값을 불러올수 있다
  name: "authSlice",
  initialState: loadMemberCookie(),
  //스토어의 초기 상태를 loadMemberCookie()를 실행하여 설정해줌
  //새로고침 될때마다 현재 쿠키상태를 확인함
  reducers: {
    //로그아웃 시 실행되는 리듀서
    logout: (state, action) => {
      console.log("로그아웃중..");
      removeCookie("member"); //member 로 등록된 쿠키 삭제
      return { ...initState };
    },
    socialLoginSuccess: (state, action) => {
      const payload = action.payload;

      setCookie("member", JSON.stringify(payload), 1 / 24);

      state.isLoggedIn = true;
      state.accessToken = payload.accessToken;
      state.memberRole = payload.memberRole;
      state.loginId = payload.loginId;
      state.error = null;
    },
  }, // social reducer 추가
  extraReducers: (builder) => {
    builder
      //로그인 버튼이 눌리면 loginAsync 가 실행되어 그 상태(fulfilled, rejected, pending)에 따라 처리합니다
      .addCase(loginAsync.pending, (state) => {
        //로그인 pending 상태일때 처리
        console.log("로그인중..");
        state.isLoading = true; //로딩중..
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        //로그인 fulfilled 상태일때 처리(성공)
        console.log("로그인 성공");
        //loginAsync 에서 { ...payload:data } 로 담아줘서 아래에는 토큰이 담긴다
        const payload = action.payload; //백엔드에서 온 토큰
        setCookie("member", JSON.stringify(payload), 1 / 24); //쿠키 저장
        state.isLoading = false;
        state.isLoggedIn = true;
        state.accessToken = payload.accessToken; //백엔드에서 보내준 데이터의 토큰
        state.memberRole = payload.memberRole; //백엔드에서 보내준 데이터의 권한
        state.error = null;
        state.loginId = payload.loginId;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log("로그인 실패");
        state.isLoading = false;
        state.error = action.payload; //백엔드에서 보내는 에러
      })
      //registerAsync 는 회원가입 시 실행됨
      .addCase(registerAsync.pending, (state) => {
        console.log("회원가입 처리중");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        console.log("회원가입 성공");
        state.isLoading = false;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        console.log("회원가입 실패");
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { logout, socialLoginSuccess } = authSlice.actions;
export default authSlice.reducer;
