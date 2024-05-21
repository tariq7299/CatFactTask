**Use better error handling better axios**
  

    - Use http-only cookies  
    - Remove the getToken() function from authProvider.jsx hook
    - Chnage name of axiosInstances file to something better
    - Fix wronge logout alert

# Questions
1. How to use useAut() in axiosInstances.jsx ? like it show this error !:

``` js
AuthProvider.jsx:103 Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
```
2. How to replace the login in axios funciton in AuthProvider ??



- remove all consol.logs


**Use React toaster instead of React bootstrap alerts**
    - Create new branch first of using react bootstrap component  and use the main for React toaster
    - 