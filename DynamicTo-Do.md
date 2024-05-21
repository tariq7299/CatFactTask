**Use better error handling better axios**
    -   Create a helper folder
    - Use axios instance to with a base url and header 
    -   Use it in creating, updating, deleting, fetching usersCatfacts, fetching Internet cat facts
    - Create a error handling function to be used every where (you pass in response, then it outputs the app)
        - Add error handling function to creating new fact
        - Add error handling to updating new fact
        - Add error handling to deleting new fact  

    - Remove the token from cookies when user is unAuthenticated() 
    - Use http-only cookies  
    - Remove the getToken() function from authProvider.jsx hook
    - Chnage name of axiosInstances file to something better

# Questions
1. How to use useAut() in axiosInstances.jsx ? like it show this error !:

``` js
AuthProvider.jsx:103 Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
```




- remove all consol.logs


**Use React toaster instead of React bootstrap alerts**