# markjs
mark is a javascript mvvm framework, easy to templating and data binding.

# Pilosophy

# Development Target
1. Mark (V) <= v0.0.1
2. Text (V) <= v0.0.1
3. Template (V) <= v0.0.1
4. input (V) <= v0.0.1
5. Checkbox and Radio (V) <= v0.0.1
6. List (ongoing) <= v0.0.2 at 07 November 2015
7. Todo <= v0.0.3 at 14 November 2015

#how to use
Use `mark.js` in html :
`<script src="mark.js"></script>`
Mark is a global variable that will reactive any subscriber and update that data or render it.

## Template
This will render `Hello World`
```
<div mk="testTmpl"></div>
<template name="testTmpl">Hello World</template>
```
Template like controller-like in mvc. `template` have `name` attribute, that will be a token to render template in a html element with attribute `mk` with same value.

## Text
Simple use `Mark.set('name', 'value');` and render it on `mk-text`
```
<b mk="coolTmpl"></b>
<template name="coolTmpl">Hello, <span mk-text="Name"></span></template>
<script>
    Mark.set('Name', 'Yoza');
</script>
```
Open your console type `Mark.set('Name', 'Dhika')`, it will update `mk-text="Name"`.

## Input
Input provided by two mark for now, that are `mk-val` and `mk-check`.
```
<div mk="inputTmpl"></div>
<template name="inputTmpl">
    <input mk-value="newItem" type="text" />
    <input mk-check="cbx" type="checkbox" />
</template>
<script>
    Mark.set('newItem', 'test');
    Mark.set('cbx', true);
</script>
```
----
#LICENSE

The MIT License (MIT)

Copyright (c) 2015 Mistralworks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
