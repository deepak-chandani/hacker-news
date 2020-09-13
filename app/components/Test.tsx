import * as React from 'react';
import {fetchUser} from '../utils/api';
import useAsync, {Status} from "../hooks/useAsync";
import {User} from "../types/common";

const fetcher = () => fetchUser('davidodio')

const Test = () => {
  const {status, execute, value, error} = useAsync<User>(fetcher);

  if(status === Status.IDLE){
    return <p>sitting in idle state</p>
  }

  if(status === Status.PENDING){
    return <p>fetching data...</p>
  }

  if(status === Status.SUCCESS){
    return (
        <div>
          <p>Data fetched successfully</p>
          <div>
            <pre>
              {JSON.stringify(value, null, 2)}
            </pre>
          </div>
          <div>
            <button onClick={execute}>Click to execute</button>
          </div>
        </div>
    )
  }

  return (
      <div>
        <button onClick={execute}>Click to execute</button>
      </div>
  )
};

export default Test;
