import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component{

    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onPasswordChange(text){
        this.props.passwordChanged(text);
    }

    onButtonPress(){
        const { email, password } = this.props;
        this.props.loginUser({email,password});
    }

    renderButton(){
        if(this.props.loading){
            return <Spinner size="large" />;
        }

        return <Button onPress={this.onButtonPress.bind(this)}>
                        Login
                    </Button>;
    }

    renderStatus(){
        if(this.props.error){
            return(
                <View style={{ backgroundColor: 'white' }} >
                    <Text style={{ fontSize: 20, alignSelf: 'center',color: 'red' }}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
        if(this.props.login_type){
            if(this.props.login_type=='login'){
                return(
                    <View style={{ backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 20, alignSelf: 'center',color: 'green' }}>
                            Logged In!
                        </Text>
                    </View>
                )
            }
            if(this.props.login_type=='create'){
                return(
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={{ fontSize: 20, alignSelf: 'center',color: 'green' }}>
                        User Created!
                    </Text>
                </View>
            )
            }
        }
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="yourid@email.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="Your password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                {this.renderStatus()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return{
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        login_type: state.auth.login_type,
        loading: state.auth.loading,
    }
}

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser
})(LoginForm);