/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ReadStream, WriteStream} from 'tty';
import {BaseWatchPlugin, UsageData} from 'jest-watcher';

class QuitPlugin extends BaseWatchPlugin {
  isInternal: true;

  constructor(options: {stdin: ReadStream; stdout: WriteStream}) {
    super(options);
    this.isInternal = true;
  }

  override async run(): Promise<void> {
    if (typeof this._stdin.setRawMode === 'function') {
      this._stdin.setRawMode(false);
    }
    this._stdout.write('\n');
    process.exit(0);
  }

  override getUsageInfo(): UsageData {
    return {
      key: 'q',
      prompt: 'quit watch mode',
    };
  }
}

export default QuitPlugin;
