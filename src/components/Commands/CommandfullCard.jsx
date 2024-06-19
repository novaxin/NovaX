import React from 'react'
import { formatCreatedAt } from '../../Constents/constents'
import { BiUser } from 'react-icons/bi';

function CommandfullCard({ commant }) {
  if (!commant) {
    return <p>No commands available</p>;
  }
  return (
    <>
      {commant.map((command, index) =>
        <>
          <div className="container">
            <div className="row" key={index}>
              <div className="col-12">
                <div className="card mt-2">
                  <div className="card-body">
                    <p>{command.command}</p>
                    <div className="card-footer">
                      <p className='d-inline p-2 counters'><BiUser /> {command.username}</p>
                      <p className='d-inline p-2 counters'>{formatCreatedAt(command.created)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </>
      )}
    </>
  )
}

export default CommandfullCard