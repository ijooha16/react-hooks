import MyReact, { useState } from "./MyReact.mjs"


function ExampleComponent() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('foo');
    
    return {
        click: () => setCount(count + 1),
        type: (text) => setText(text),
        result: () => console.log('render', {count, text})
    }
}

let App = MyReact.render(ExampleComponent); //exampleComponent를 렌더