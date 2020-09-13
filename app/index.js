import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Switch } from 'react-router-dom'
import {useTheme} from './contexts/theme'
import Loading from './components/Loading'
import Nav from './components/Nav'
import {AppProviders} from "./contexts";

const Posts = React.lazy(() => import('./components/Posts'))
const Post = React.lazy(() => import('./components/Post'))
const User = React.lazy(() => import('./components/User'))
const Test = React.lazy(() => import('./components/Test'))

const App = () => {
  const {theme} = useTheme();

  return (
     <div className={theme}>
       <div className='container'>
         <Nav />

         <React.Suspense fallback={<Loading />}>
           <AppRoutes/>
         </React.Suspense>
       </div>
     </div>
   )
};

const AppRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => <Posts type='top' />}
      />
      <Route
        path='/new'
        render={() => <Posts type='new' />}
      />
      <Route path='/post' component={Post} />
      <Route path='/user' component={User} />
      <Route path='/test' component={Test} />
      <Route render={() => <h1>404</h1>} />
    </Switch>
  )
}

ReactDOM.render(
  <AppProviders><App /></AppProviders>,
  document.getElementById('app')
)
