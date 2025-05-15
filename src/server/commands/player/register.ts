import Command from '../command';

type RegisterData = {
  name: string;
  password: string;
};

type RegisterResponse = {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
};

const registry: Command<RegisterData, RegisterResponse> = {
  async execute(data) {
    return {
      name: data.name,
      index: 1,
      error: false,
      errorText: '',
    };
  },
};

export default registry;
