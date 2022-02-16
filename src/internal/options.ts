import program from 'commander';

type Option = { option: string; description: string };

type AddCommandParams = {
  name: string;
  description: string;
  options?: Option[];
};

// 不限制回调的入参
type CallBack = (...rest: any[]) => void;

export function addCommand(
  { name, description, options }: AddCommandParams,
  callback: CallBack,
) {
  let command = program.command(name).description(description);

  if (options) {
    for (const { option, description } of options) {
      command = command.option(option, description);
    }
  }

  command.action(callback);
}
