import { Component } from 'react'

export default class Loader extends Component {
  render() {
    return (
      <section className='vh-100 vw-100 position-absolute top-0 right-0 z-3'>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div>
                        <img src="./loader.svg" className="img-fluid" alt="Loading..." />
                    </div>
                </div>
            </div>
        </div>
      </section>
    )
  }
}
