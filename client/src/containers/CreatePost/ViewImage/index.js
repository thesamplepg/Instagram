import React from 'react';

import classes from './index.css';
import ButtonLoader from '../../../components/ButtonLoader';
import Header from '../../Header';

class ViewImage extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className={classes.ViewImage}>
                    <div className={classes.ImageContainer}>
                        <img 
                            src={this.props.image} 
                            alt="post" 
                            ref={this.image}
                        />
                    </div>
                    <div className={classes.Buttons}>
                        <div onClick={this.props.repick} className={classes.Button + ' ' + classes.Repick}>
                            Repick
                        </div>
                        <div className={classes.Button + ' ' + classes.Submit} onClick={this.props.submit}>
                            Submit
                            {this.props.loading ? <ButtonLoader /> : null}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ViewImage;
