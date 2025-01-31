let hooks = [],
    currentHook = 0;

const useState = (initialValue) => {
    if (!value) {
        value = initialValue;
    }

    function setValue(newValue) {
        value = newValue;
    }
    
    return [value, setValue]
}

export default useState