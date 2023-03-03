## 1. What is the difference between Component and PureComponent? give an example where it might break my app.
>A: A Pure function in JavaScript is considered Pure for two reasons: one, with the same input it will ALWAYS return the same output, and it has not any side effects. A Functional Component can behave the same way, if its PureComponent, then the function of the component is considered a Pure Function. If you consider only to create Functional Components that performs algorithm or state operations inside it, then you will end up on relying on them, and they are not reliable because they can produce side effects like for example a certain input which is considered a edge case was passed to the Component and it breaks only because of that different input, that makes the component not really reliable. If it was Pure, nothing like this would happen.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
>A: The Context is used to communicate between high level and lower level components in a container, so it has information on where you are in terms of responsibility, because it refers to the actual context which will vary depending on how deep you are. The ShouldComponentUpdate Lifecycle verifies if the re-rendering of an part of the component tree is really necessary, and it also includes its children. To use context in a situation like this may cause a block of the propagation for the context in this case.

## 3. Describe 3 ways to pass information from a component to its PARENT.
>A: State Management is the widely most used and recommended method to do this. Another way is using a callback handler into the child passing the data as argument of it and calling this callback on the parent, all via props. Another way is using refs, but i would not recommend doing this.

## 4. Give 2 ways to prevent components from re-rendering.
>A: Setting state inside a effect can cause side effects and its not recommended doing it, since it can trigger unwanted re-renders, thats why effects are meant for Syncronization and its NOT used like an lifecycle because it isnt one. For instance if you want to run a function on the first render and make sure it will not run again, just evoke the function in the component context simply. Also you could avoid too much prop drilling using state management, because everytime a prop value changes the component is re-rendered. useMemo is useful to prevent that but you have to see what's better suitable for the situation.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
>A: Fragment is syntax wrapper to bond two or more elements into the same level, it isnt really a element but can group up elements inside it. Something i wouldnt recommend to do is to think that it is like a div or something like this, because it isnt and if you behave the Fragment as a Div you will end up having not intended graphical glitches in your application. Fragments should be only used when a wrapper is not even necessary at all but you need to make the syntax work.

## 6. Give 3 examples of the HOC pattern.
>A: High Order Components are meant to somewhat "extend" functionallity without needing to recall it or rewritting it. Its widely used in the routing schema when you want to layout the application pages for instance, you could use useLayout(<Page />) and apply the layout to the page without needing to do anything more than that, and also you use it on the withRouter stuff to add the component to the router. Another example is used on state management like Redux when you use the connect method.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.
>A: Promises once fired they cannot be aborted unless you are using some sort of AbortController and prevent it to fulfill so handling exceptions inside promises its really tricky and not really recommended. Callbacks are fine to deal with exceptions because even not having the correct context you know the expected correct behaviour so not having the context isnt really a problem here. The most widely used way to deal with exceptions due to not expected results is using async functions and by prefixing await to the actual results. That way you can deal with the exception using a functional approach and its way better to read and understand the code.

## 8. How many arguments does setState take and why is it async.
>A: setState does take two arguments the updater object and the callback. You can also provide a function as argument to access the actual state directly while updating it. It is asyncronous because React waits on purpose for all of the setState calls to happen because it wants to prevent unnecessary re-rendering.

## 9. List the steps needed to migrate a Class to Function Component.
>A: First, remove the class keyword of the component declaration and transform it into a constant variable or a function itself and remove the extend of Component. Secondly, check the lifecycle methods and the state, after that, decide what hooks and effects suits best and remove completely the lifecycles and use the effects accordingly to sincronize state and create event handlers to act as lifecycle methods, or even use a custom hook if necessary. After that, transform the state object into useState hooks and replace the setState calls with the desired state update calls. Also remove the places where it possibly be acessing state directly and replace with the useState state variable. Also you need to remove the old fashioned way to access props via context and inform the props as argument of the component function, prefferably using a destructor to make it look cleaner and access them directly. Be sure to not use any kind of context and remove all of the "this" found and access state and props directly. Lastly, export default the constant or export the function directly to be able to extend the component.

## 10. List a few ways styles can be used with components.
>A: Nowadays, I do prefer to use React Styled Components to accomplish this task because you can create Styles as you create Component Wrappers and use them into the JSX syntax and it looks clean and makes you capable of writing plain CSS to achieve style behavior necessary. Like applying to more than one component without needing to specify inline on all. Styles can also be a simple object of keys containing React.CSSProperties as values and just use them as value of the style prop on the elements. Or you could even use a separated css file that you can just import into the component and then use classNames into the elements to make them styled.

## 11. How to render an HTML string coming from the server.
>A: In React, you need to use `dangerouslySetInnerHTML` attribute in the element that you want to have its inner HTML fulfilled by the HTML string, but its unsafe since it will eval the html and could be a potential risk of XSS.