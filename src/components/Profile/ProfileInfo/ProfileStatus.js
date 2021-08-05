import React from 'react';

class ProfileStatus extends React.Component{

    state = {
        editMode:false,
        status: this.props.status,
    }

    activeEditMode = () =>{
       
        this.setState({
            editMode:true
        })
    }

    deactiveEditMode = () =>{
        
        this.setState({
            editMode:false
        });
        this.props.updateStatus(this.state.status);
    }

    changeStatus = (e) =>{
      
        this.setState({
            
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps,prevState){
        
        
        if(prevProps.status !== this.props.status){
            this.setState({
                status:this.props.status
            });
        }
    }


    render(){
        return(
            <>
            { !this.state.editMode ?
                <div>
                    <div onDoubleClick={ this.activeEditMode}>{this.props.status || 'Нет статуса'}</div >
                </div>
                 :
                <div>
                   
                    <input onChange={this.changeStatus} autoFocus={true} onBlur={this.deactiveEditMode} value={this.state.status} />
                </div>
    }
            </>
        )
    }
}

export default ProfileStatus;