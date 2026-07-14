import React, { ErrorInfo, ReactNode } from 'react';
import { log } from '../utils/logger';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    log.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/50 text-primary p-4">
          <div className="bg-white p-8 rounded-2xl shadow-premium border border-primary/10 max-w-lg w-full text-center">
            <h1 className="text-2xl font-display font-bold uppercase mb-4 text-accent">Oups, une erreur est survenue !</h1>
            <p className="text-sm font-sans mb-6 text-primary/70">
              Nous sommes désolés, l'application a rencontré un problème inattendu.
            </p>
            <button aria-label="Bouton d'action"
              className="px-6 py-2.5 bg-primary text-white rounded-full font-bold uppercase text-xs hover:bg-accent transition-colors"
              onClick={() => window.location.reload()}
            >
              Recharger la page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-8 p-4 bg-secondary text-left text-xs overflow-auto rounded-xl">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
