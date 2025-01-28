import { useState, useEffect, useRef } from 'react';

function Example() {
    const [count, setCount] = useState<number>(0);
    const testElement = useRef<HTMLDivElement>(null);
    const [name, setName] = useState<string>('');
    useEffect(() => {
        // Update div element's color based on count
        testElement.current?.style.setProperty('color', `rgb(${count * 5}, 0, 0)`);
    }, [count]); // Only re-run the effect if count changes

    return (
        <>

        <h2>Example Page</h2>
        <div ref={testElement}>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>

        <div>
            <p>You entered: {name}</p>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>

        </>
    );
}

export default Example;
