import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, errorInfo) {
      this.setState({ hasError: true });
      // You can log the error to an error reporting service here
        console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render a custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children;
    }
  }
  
    export default ErrorBoundary;