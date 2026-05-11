import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="panel p-6 text-center space-y-3">
          <p className="text-loss text-sm font-semibold">Something went wrong</p>
          <p className="text-xs text-white/40">
            {this.state.error.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => this.setState({ error: null })}
            className="btn-ghost text-xs"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
