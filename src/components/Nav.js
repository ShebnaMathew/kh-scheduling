/**
 * Nav bar - has the help section on the top right, which displays a simple modal.
 */
import { useState } from 'react';

const Nav = () => {

    const [showModal, setShowModal] = useState(false);

    return(
        <nav class="navbar navbar-dark bg-primary kh-position-fixed">
            <div class="container-fluid">
                <a class="navbar-brand me-0 pe-0" href="#">
                    <img src="KingsHillLogo.png" alt="" width="30" height="24" class="d-inline-block align-text-top pe-2"/>
                    KH Scheduler
                </a>
                <button type="button" class="btn btn-primary" onClick={() => setShowModal(true)}>
                    <i class="far fa-question-circle"></i>
                </button>
                {showModal ?
                    <div class="modal fade kh-view mt-5 pt-3" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Instructions</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div class="modal-body">
                                    <p className='text-muted'>You can see I haven't put much effort into this help section.</p>
                                    <p>1. Select a blockout date to add volunteers for that date</p>
                                    <p>2. Hit Save</p>
                                    <p>3. Do this for all blockout dates</p>
                                    <p>4. Made a mistake ? Just select the date that needs correction and add the volunteers again</p>
                                    <p>5. Once all the blockouts are set, create the schedule</p>                                        <p>6. This app doesn't have permanent storage, so all data would be lost once you hit refresh lol</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                :""}
            </div>
        </nav>
    )
}

export default Nav;