let hooks = [],
    currentHook = 0;

const MyReact = {
    render(Component) {
        const Comp = Component(); //컴포넌트 실행
        Comp.result(); //컴포넌트의 result 함수 실행
        currentHook = 0; //훅 인덱스 초기화, 다시 순회할 때 처음부터
        return Comp; //컴포넌트 반환
    },
};

export const useState = (initialValue) => {
    hooks[currentHook] = hooks[currentHook] || initialValue; //비어있다면 초깃값
    const hookIndex = currentHook; //지금 인덱스 전용 setState

    const setState = (newState) => {
        if (typeof newState === "function") {
          hooks[hookIndex] = newState(hooks[hookIndex]);
        } else {
          hooks[hookIndex] = newState;
        }
    };
    
    
    return [hooks[currentHook++], setState]
}

export default MyReact;