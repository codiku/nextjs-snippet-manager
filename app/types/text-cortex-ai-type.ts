export interface TextCortexResponse {
  data: Data;
  status: string;
}

interface Data {
  outputs: Output[];
  remaining_credits: number;
}

interface Output {
  index: number;
  text: string;
}
