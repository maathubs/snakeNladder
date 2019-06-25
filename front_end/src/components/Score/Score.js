import React from 'react';
import './Score.css';
const Score = (props) => {
  console.log('@ score component : ', props)
  return (
    <div class="score-box">
      {
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {
              props.users.map(user => {
                return (<tr>
                  <td>{user.userId}</td>
                  <td>{user.position}</td>
                </tr>)
              })
            }
          </tbody>
        </table>
      }
    </div>
  )
}
export default Score;



