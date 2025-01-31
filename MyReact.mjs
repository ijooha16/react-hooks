let hooks = [], //hooks의 값들 모음
    currentHook = 0; //현재 훅, hooks의 인덱스를 나타냄

const MyReact = {
    render(Component) { //render 메소드에 컴포넌트 인자를 넣으면,
        const Comp = Component(); //컴포넌트 실행
        Comp.result(); //컴포넌트의 result 함수 실행(console.log)
        currentHook = 0; //훅 인덱스 초기화, 다시 순회할 때 처음부터
        return Comp; //컴포넌트 반환
    },
};

export const useState = (initialValue) => {
    hooks[currentHook] = hooks[currentHook] || initialValue; //비어있다면 초깃값
    const hookIndex = currentHook; //지금 인덱스 전용 setState, 값 같지만 주소 다름

    const setState = (newState) => { //setState
        if (typeof newState === "function") { //함수인 경우
          hooks[hookIndex] = newState(hooks[hookIndex]); //함수 실행
        } else { //함수 아닌 값일 떄
          hooks[hookIndex] = newState; //바로 넣어주기
        }
    };
    
    return [hooks[currentHook++], setState] //++로 다음 useState 인덱스로 넘어가기
}

export const useEffect = (callback, depArray) => {
    const hasNoDeps = !depArray //의존배열 없으면 true, 있으면 false
    const prevDeps = hooks[currentHook] 
        ? hooks[currentHook].deps  //hooks에 값 있으면 그 deps 값
        : undefined; // 없으면 undefined
  
    const prevCleanup = hooks[currentHook]
      ? hooks[currentHook].cleanup //hooks 에 값 있으면 cleanup 값
      : undefined; //없으면 undefined
      
    const hasChangedDeps = prevDeps //의존배열 있는데
      ? !depArray.every((el, i) => el === prevDeps[i]) //변화가 없으면 false, 있으면 true
      : true; //이전 의존배열 없으면 true
  
    if (hasNoDeps || hasChangedDeps) { //의존 배열 없거나, 변화 있으면
      if (prevCleanup) prevCleanup(); //이전 클린업 함수 실행 (존재하는 경우)
      const cleanup = callback(); //콜백 함수 실행 후 반환값 cleanup에 저장
      hooks[currentHook] = { deps: depArray, cleanup }; //hooks 값에 의존배열, 클린업 함수 객체로 저장
    }
    
    currentHook++; //다음 인덱스 (다음 훅으로)
  };

export default MyReact;