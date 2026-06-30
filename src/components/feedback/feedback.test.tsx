import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorFallback } from './ErrorFallback';
import { LoadingSpinner } from './LoadingSpinner';
import { ToastContainer, toast, useToastStore } from './Toast';

describe('ErrorFallback Component', () => {
  it('renders title and error message correctly', () => {
    const errorObj = new Error('Database connection failed');
    render(<ErrorFallback error={errorObj} title="Custom Connection Error" />);

    expect(screen.getByText('Custom Connection Error')).toBeInTheDocument();
    expect(screen.getByText('Database connection failed')).toBeInTheDocument();
  });

  it('triggers onReset callback when Try Again button is clicked', () => {
    const handleReset = vi.fn();
    render(<ErrorFallback error={new Error('Some error')} onReset={handleReset} />);

    const button = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(button);

    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});

describe('LoadingSpinner Component', () => {
  it('renders standard loading message and has status role', () => {
    render(<LoadingSpinner label="Retrieving records..." />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Retrieving records...')).toBeInTheDocument();
  });

  it('honors accessibility specs when size is sm', () => {
    render(<LoadingSpinner size="sm" label="Secret Loading" />);
    // Under size sm, label text is hidden from visual output but exists in aria-label
    expect(screen.queryByText('Secret Loading')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Secret Loading');
  });
});

describe('Toast Component Store and Container', () => {
  it('allows adding and removing toasts programmatically', () => {
    render(<ToastContainer />);

    // Trigger toast adding in an act block because it updates Zustand state which triggers rendering
    act(() => {
      toast.success('Patient saved successfully');
    });

    expect(screen.getByText('Patient saved successfully')).toBeInTheDocument();

    // Now let's trigger an error toast
    act(() => {
      toast.error('Failed to create encounter');
    });

    expect(screen.getByText('Failed to create encounter')).toBeInTheDocument();

    // Check we can remove it manually by clicking the close button
    const closeButtons = screen.getAllByRole('button', { name: /close toast/i });
    expect(closeButtons.length).toBe(2);

    act(() => {
      fireEvent.click(closeButtons[0]!);
    });

    // Check one toast remains in the store state immediately, avoiding exit animation DOM lag
    expect(useToastStore.getState().toasts.length).toBe(1);

    // Clean up store state
    act(() => {
      useToastStore.setState({ toasts: [] });
    });
  });
});
