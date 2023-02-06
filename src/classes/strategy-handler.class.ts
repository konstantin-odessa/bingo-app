import { StrategyStateEnum } from '../enums/strategy-state.enum';

export class StrategyHandler {
  private _strategyFillerMap: Map<number, boolean>;
  private _status = StrategyStateEnum.PENDING;

  constructor(strategy: number[]) {
    this._strategyFillerMap = new Map(strategy.map((s) => [s, false]));
  }

  checkIfEntryIsApplicable(entry: number): boolean {
    return this._strategyFillerMap.has(entry);
  }

  toggleEntry(entry: number): void {
    if (this.checkIfEntryIsApplicable(entry)) {
      this._strategyFillerMap.set(entry, !this._strategyFillerMap.get(entry));

      this._status = Array.from(this._strategyFillerMap.values()).every(Boolean)
        ? StrategyStateEnum.FULFILLED
        : StrategyStateEnum.PENDING;
    }
  }

  getState(): StrategyStateEnum {
    return this._status;
  }

  getStrategy(): number[] {
    return Array.from(this._strategyFillerMap.keys());
  }
}
