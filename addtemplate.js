

var html = `<h1>Add a User</h1>
<form action="/adduser" method="POST">
<div class="formDiv">
    <label for="username">Username:</label>
    <input type="text" name="username" id="username" placeholder="username..." autocomplete="off">
</div>
<div class="formDiv">
    <label for="password">Password:</label>
    <input type="text" name="password" id="password" placeholder="password..." autocomplete="off">
</div>
<div class="formDiv">
    <label for="firstname">Firstname:</label>
    <input type="text" name="firstname" id="firstname" placeholder="firstname..." autocomplete="off">
</div>
<div class="formDiv">
    <label for="lastname">Lastname:</label>
    <input type="text" name="lastname" id="lastname" placeholder="lastname..." autocomplete="off">
</div>
<div class="formDiv">
    <label for="email">Email:</label>
    <input type="email" name="email" id="email" placeholder="email..." autocomplete="off">
</div>
<div class="formDiv">
    <label for="age">Age:</label>
    <input type="number" name="age" id="age" min="12" max="100" placeholder="age..." autocomplete="off">
</div>
<div class="formDiv">
    <label for="gender">gender:</label>
    <select name="gender" id="gender">
    <option value="male">Male</option>
    <option value="female">Female</option>
    </select>
</div>
<div class="formDiv">
    <label for="balance">balance:</label>
    <input type="number" name="balance" id="balance" step="100" min="100" max="10000" placeholder="balance..." autocomplete="off">
</div>

<button type="submit">Add</button>
</form>`


module.exports = html;