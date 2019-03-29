import React from 'react';

import classes from './index.css';
import ButtonLoader from '../../../components/ButtonLoader';
import Header from '../../Header';

class ViewImage extends React.Component {

    constructor (props) {
        super(props);

        this.image = React.createRef();
        this.state = {
            adaptive: false
        }
    }

    componentDidMount() {
        console.log(window.innerWidth, this.image.current)
        if(window.innerWidth <= this.image.current.clientWidth) {
            this.setState({adaptive: false});
        } 
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className={classes.ViewImage}>
                    <div className={[classes.ImageContainer, this.state.adaptive ? classes.Adaptive : ''].join(' ')}>
                        <img 
                            src={this.props.image} 
                            alt="post" 
                            ref={this.image}
                        />
                    </div>
                    <div onClick={this.props.repick} className={classes.Button + ' ' + classes.Repick}>
                        Repick
                    </div>
                    <div className={classes.Button + ' ' + classes.Submit} onClick={this.props.submit}>
                        Submit
                        {this.props.loading ? <ButtonLoader /> : null}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ViewImage;
