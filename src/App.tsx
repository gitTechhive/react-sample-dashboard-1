import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Loader from './common/Loader';
import { RootState } from './redux/store';
import { connect } from 'react-redux';
import AppRouter from './routes';


function App(props) {
  const flg = false;

  return (
    <div >
      <Toaster position="top-right" reverseOrder={flg} />
      <Loader loading={props.appReducer.loading} />
   
        <AppRouter />
   

    </div>
  );
}



const mapStateToProps = (state: RootState) => {
  return { appReducer: state.loaderReducer };
};

const mapDispatchToProps = (): any => {

};
export default connect(mapStateToProps, mapDispatchToProps)(App);
