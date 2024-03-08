import React from 'react'
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import { loading } from '../../../redux/Loader/loader.action';

const Login = (props) => {
    return (
        <>
            <div>Login</div>
            <button onClick={() => {
                localStorage.setItem("token", "hii");
                props.loading(true);
                setTimeout(() => {
                    props.loading(false);
                }, 2000);
            }}>
                login
            </button>
        </>
    )
}
const mapStateToProps = (state: RootState) => {
    //   return { appReducer: state.loaderReducer };
};

const mapDispatchToProps = {
    loading

};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login