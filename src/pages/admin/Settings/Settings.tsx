import React, { useEffect, useRef, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { ENUM_FOR_SETTING_TAB } from '../../../Utility/Enums';
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import PersonalDetails from './PersonalDetails';
import ChangePassword from './ChangePassword';
/**
 * Component for managing user settings.
 * Renders different tabs for managing personal details, preferences, etc.
 * @param {Object} props - Props injected into the component.
 * @returns {JSX.Element} JSX representation of the component.
 */
const Settings = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    /**
        * State to manage the currently selected tab.
        * Defaults to ENUM_FOR_SETTING_TAB.SETTING.
        */

    const [selectedTab, setSelectedTab] = useState<string>(ENUM_FOR_SETTING_TAB.SETTING);

    /**
     * Handles tab selection.
     * Updates selectedTab state if a different tab is selected.
     * @param {string} value - The value of the selected tab.
     */
    const handleTab = (value: string) => {
        if (selectedTab != value) {
            setSelectedTab(value)
        }
    }



    return (
        <>
            <div className="page-content">
                <div className="page-title-container">
                    <div className="page-title-left">
                        <h6>Settings</h6>
                    </div>
                    <div className="page-title-right">

                    </div>
                </div>
                <div className="content-area">
                    <div className="settings-container">
                        <div className="card card-settings">
                            <div className="card-body">
                                <ul id="myTab" role="tablist" className="nav nav-tabs">
                                    <li role="presentation" className="nav-item">
                                        <button type="button" role="tab" aria-controls="myprofile-tab-pane" className={`nav-link ${selectedTab === ENUM_FOR_SETTING_TAB.SETTING ? "active" : ""} `} onClick={() => { handleTab(ENUM_FOR_SETTING_TAB.SETTING) }}>My Profile</button>
                                    </li>
                                    <li role="presentation" className="nav-item">
                                        <button type="button" role="tab" aria-controls="changepassword-tab-pane" className={`nav-link ${selectedTab === ENUM_FOR_SETTING_TAB.CHANGE_PASSWORD ? "active" : ""} `} onClick={() => { handleTab(ENUM_FOR_SETTING_TAB.CHANGE_PASSWORD) }}>Change Password</button>
                                    </li>

                                </ul>
                                {
                                    selectedTab === ENUM_FOR_SETTING_TAB.SETTING && (
                                        <PersonalDetails selectedTab={selectedTab} />
                                    )
                                }
                                {
                                    selectedTab === ENUM_FOR_SETTING_TAB.CHANGE_PASSWORD && (
                                        <ChangePassword selectedTab={selectedTab} />
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    return {

    };

};

const mapDispatchToProps = {



};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
