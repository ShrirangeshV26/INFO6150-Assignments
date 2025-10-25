# Part A — Calculator with Login

- Validates Northeastern email & password (8+ chars) via jQuery on keyup/blur.
- Login button disabled until both fields pass.
- On success, stores session (sessionStorage or localStorage if “Remember Me”).
- Calculator uses a **single** arrow function `calculate(num1,num2,op)` for all ops.
- Numeric validation supports negatives & decimals; divides guard against 0.
- Logout clears session and redirects.
