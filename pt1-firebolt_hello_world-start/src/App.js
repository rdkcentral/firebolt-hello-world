/*
* Copyright 2021 Comcast Cable Communications Management, LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* SPDX-License-Identifier: Apache-2.0
*/

import { Lightning, Utils, Log } from '@lightningjs/sdk';

const  LifecycleColors = ({
	// BLUE
	BOOT: '0xff0000ff',
	// RED
	INACTIVE: '0xffff0000',
	// ORANGE
	BACKGROUND: '0xffE69738',
	// GREEN
	FOREGROUND: '0xff00aa00'
});

export class App extends Lightning.Component {
	static getFonts() {
		return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }];
	}

	static _template() {
		return {
			HelloWorld: {
				w: 1920,
				h: 1080,
				rect: true,
				color: LifecycleColors.BOOT,
				FireboltStatus: {  
					Lifecycle: { mountX:0.5, x: 960, y: 400, text: { text: 'Lifecycle not Ready!', fontFace: 'Regular', fontSize: 50 }},
					Device: { mountX:0.5, x: 960, y: 480, text: { text: 'Device Information not Available!', fontFace: 'Regular', fontSize: 35 }},
				},
				Complete: { 
					visible:false, mountX:0.5, x: 960, y: 250,
					text: { text: 'Firebolt >> Hello World', fontFace: 'Regular', fontSize: 90 },
				}, 
			},
		};
	}

	_init() {
	}

	_active() {
	}
}
