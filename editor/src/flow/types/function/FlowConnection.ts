export class FlowConnection {
  public id: string; // A GUID
  public label: string | null;
  public description: string | null;

  public startInputOutputId: string;
  public endInputOutputId: string;

  constructor(id: string, label: string | null, description: string | null, startInputOutputId: string, endInputOutputId: string) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.startInputOutputId = startInputOutputId;
    this.endInputOutputId = endInputOutputId;
  }
}
