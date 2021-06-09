import React from 'react';
import { IContext, MathJaxUnknown } from '.';
import Context, { Consumer } from './Context';

export interface IProps {
  onRender?: (...args: any[]) => any;
  classes?: any;
  options?: any;
  text?: string;
}

class Text extends React.Component<IProps & { context: IContext }> {
  public static contextType: React.Context<{ MathJax: MathJaxUnknown }>;

  public componentDidMount() {
    this.refreshMathJax();
  }

  public componentDidUpdate() {
    this.refreshMathJax();
  }

  public refreshMathJax() {
    const { MathJax } = this.props.context;
    if (!MathJax) {
      throw Error('Could not find MathJax while attempting typeset! Probably MathJax script hasn\'t been loaded or MathJax.Context is not in the hierarchy');
    }

    MathJax.Hub.Queue(
      MathJax.Hub.Typeset(this.div, this.props.onRender)
    );
  }

  public render() {
    return (
      <div key={this.props.text} ref={div => this.div = div}>
        {this.props.text}
      </div>
    );
  }

  private div!: HTMLDivElement | null;
}

export default (props: IProps) => (
  <Consumer>
    {context => (<Text {...props} context={context} />)}
  </Consumer>
);
