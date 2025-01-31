import MyReact, { useState, useEffect } from "./MyReact.mjs"


function ExampleComponent() {
    const [count, setCount] = useState(0); //hooks의 0번째 인덱스 값,
    const [text, setText] = useState('foo'); //hooks의 1번째 인덱스 값으로 들어감
    
    useEffect(() => {
        console.log("effect", count, text);
        return () => {
          console.log("cleanup", count, text);
        };
    }, [count, text]);
    
    return {
        click: () => setCount(count + 1),
        type: (text) => setText(text),
        noop: () => setCount(count),
        result: () => console.log("render", { count, text }),
      };
}

let App = MyReact.render(ExampleComponent); //exampleComponent를 렌더

App.click();
App = MyReact.render(ExampleComponent);

App.type("bar");
App = MyReact.render(ExampleComponent);

App.noop();
App = MyReact.render(ExampleComponent);

App.click();
App = MyReact.render(ExampleComponent);