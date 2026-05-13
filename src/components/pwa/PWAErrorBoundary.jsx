import { Component } from "react";
import { ErrorShell } from "./ErrorShell.jsx";

export class PWAErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[PWA Error Boundary]", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorShell
          error={this.state.error}
          onRetry={() => this.setState({ error: null })}
        />
      );
    }
    return this.props.children;
  }
}
