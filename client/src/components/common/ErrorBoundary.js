import React, { Component } from 'react';

class ErrorBoundary extends Component {
   state = {
      hasError: false
   }

   componentDidCatch() {
      this.setState({ hasError: true });
   }

   render() {
      const { hasError } = this.state;
      return (!hasError) ? this.props.children : <h1>Something wen't wrong...</h1> ;
   }
}

export default ErrorBoundary;