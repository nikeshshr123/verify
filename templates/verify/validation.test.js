const { validateInputs } = require('./path/to/your/validation/code'); 

test('validates input fields correctly', () => {
    
    document.body.innerHTML = `
        <input class="digit-input" value="1" />
        <input class="digit-input" value="2" />
        <input class="digit-input" value="3" />
        <input class="digit-input" value="4" />
        <input class="digit-input" value="5" />
        <input class="digit-input" value="6" />
    `;

    expect(validateInputs()).toBe(true);
});

test('detects non-numeric input', () => {
   
    document.body.innerHTML = `
        <input class="digit-input" value="1" />
        <input class="digit-input" value="2" />
        <input class="digit-input" value="a" />
        <input class="digit-input" value="4" />
        <input class="digit-input" value="5" />
        <input class="digit-input" value="6" />
    `;

    expect(validateInputs()).toBe(false);
});

test('detects empty input', () => {
   
    document.body.innerHTML = `
        <input class="digit-input" value="1" />
        <input class="digit-input" value="2" />
        <input class="digit-input" value="" />
        <input class="digit-input" value="4" />
        <input class="digit-input" value="5" />
        <input class="digit-input" value="6" />
    `;

    expect(validateInputs()).toBe(false);
});
