import React from 'react';

export default class Layout extends React.PureComponent {

    render() {        
         const error = !this.props.valid ? ( <div className="form-element-error">
                                                    {this.props.errorMessage}
                                                </div>
                                            ) : <div />; 
            return (
                <div>
                    {this.props.children}
                    {error}
                </div>
            );
    }
}