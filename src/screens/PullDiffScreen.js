import React, {Component, PropTypes} from 'react';
import {Text, View, FlatList} from 'react-native';
import {Card, ListItem} from 'react-native-elements';

import Parse from 'parse-diff';

import ViewContainer from '../components/ViewContainer';

class PullDiff extends Component {
  componentDidMount() {
    // const files = Parse(this.props.navigation.state.params.diff);
    const files = [
      {
        chunks: [
          {
            content: '@@ -101,3 +101,4 @@ A million thanks to some awesome people :)',
            changes: [
              {
                type: 'normal',
                normal: true,
                ln1: 101,
                ln2: 101,
                content: ' * [Zach Berger](https://github.com/zachberger)',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 102,
                ln2: 102,
                content: ' * [blAck PR](https://github.com/blackpr)',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 103,
                ln2: 103,
                content: ' * [Bram Borggreve](https://github.com/beeman)',
              },
              {
                type: 'add',
                add: true,
                ln: 104,
                content: '+* [Antonio Indrianjafy](https://github.com/Antogin)',
              },
            ],
            oldStart: 101,
            oldLines: 3,
            newStart: 101,
            newLines: 4,
          },
        ],
        deletions: 0,
        additions: 1,
        from: 'README.md',
        to: 'README.md',
        index: ['72cfd75..b133c60', '100644'],
      },
      {
        chunks: [
          {
            content: '@@ -43,6 +43,29 @@',
            changes: [
              {
                type: 'normal',
                normal: true,
                ln1: 43,
                ln2: 43,
                content: ' \t\t\t\t\t\tBlack (AMOLED)',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 44,
                ln2: 44,
                content: ' \t\t\t\t\t</label>',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 45,
                ln2: 45,
                content: ' \t\t\t\t</div>',
              },
              {
                type: 'add',
                add: true,
                ln: 46,
                content: '+          <h2>Change Font</h2>',
              },
              {
                type: 'add',
                add: true,
                ln: 47,
                content: '+          <div>',
              },
              {
                type: 'add',
                add: true,
                ln: 48,
                content: '+            <label>',
              },
              {
                type: 'add',
                add: true,
                ln: 49,
                content: '+              Font size:',
              },
              {
                type: 'add',
                add: true,
                ln: 50,
                content: '+              <input #titleFont',
              },
              {
                type: 'add',
                add: true,
                ln: 51,
                content: '+                     min="1"',
              },
              {
                type: 'add',
                add: true,
                ln: 52,
                content: '+                     [value]="settings.titleFontSize"',
              },
              {
                type: 'add',
                add: true,
                ln: 53,
                content: '+                     name="theme"',
              },
              {
                type: 'add',
                add: true,
                ln: 54,
                content: '+                     type="number"',
              },
              {
                type: 'add',
                add: true,
                ln: 55,
                content: '+                     (keyup)="changeTitleFont(titleFont.value)" />',
              },
              {
                type: 'add',
                add: true,
                ln: 56,
                content: '+            </label>',
              },
              {
                type: 'add',
                add: true,
                ln: 57,
                content: '+          </div>',
              },
              {
                type: 'add',
                add: true,
                ln: 58,
                content: '+          <div>',
              },
              {
                type: 'add',
                add: true,
                ln: 59,
                content: '+            <label>',
              },
              {
                type: 'add',
                add: true,
                ln: 60,
                content: '+              List spacing:',
              },
              {
                type: 'add',
                add: true,
                ln: 61,
                content: '+              <input #listSpacing',
              },
              {
                type: 'add',
                add: true,
                ln: 62,
                content: '+                     min="0"',
              },
              {
                type: 'add',
                add: true,
                ln: 63,
                content: '+                     [value]="settings.listSpacing"',
              },
              {
                type: 'add',
                add: true,
                ln: 64,
                content: '+                     name="theme"',
              },
              {
                type: 'add',
                add: true,
                ln: 65,
                content: '+                     type="number"',
              },
              {
                type: 'add',
                add: true,
                ln: 66,
                content: '+                     (keyup)="changeSpacing(listSpacing.value)" />',
              },
              {
                type: 'add',
                add: true,
                ln: 67,
                content: '+            </label>',
              },
              {
                type: 'add',
                add: true,
                ln: 68,
                content: '+          </div>',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 46,
                ln2: 69,
                content: ' \t\t\t</div>',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 47,
                ln2: 70,
                content: ' \t\t</div>',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 48,
                ln2: 71,
                content: ' \t</div>',
              },
            ],
            oldStart: 43,
            oldLines: 6,
            newStart: 43,
            newLines: 29,
          },
        ],
        deletions: 0,
        additions: 23,
        from: 'src/app/core/settings/settings.component.html',
        to: 'src/app/core/settings/settings.component.html',
        index: ['c6f2367..3e3b9dc', '100644'],
      },
      {
        chunks: [
          {
            content: '@@ -29,4 +29,12 @@ export class SettingsComponent implements OnInit {',
            changes: [
              {
                type: 'normal',
                normal: true,
                ln1: 29,
                ln2: 29,
                content: '   selectTheme(theme) {',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 30,
                ln2: 30,
                content: '     this._settingsService.setTheme(theme);',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 31,
                ln2: 31,
                content: '   }',
              },
              {
                type: 'add',
                add: true,
                ln: 32,
                content: '+',
              },
              {
                type: 'add',
                add: true,
                ln: 33,
                content: '+  changeTitleFont(val){',
              },
              {
                type: 'add',
                add: true,
                ln: 34,
                content: '+    this._settingsService.setFont(val);',
              },
              {
                type: 'add',
                add: true,
                ln: 35,
                content: '+  }',
              },
              {
                type: 'add',
                add: true,
                ln: 36,
                content: '+',
              },
              {
                type: 'add',
                add: true,
                ln: 37,
                content: '+  changeSpacing(val){',
              },
              {
                type: 'add',
                add: true,
                ln: 38,
                content: '+    this._settingsService.setSpacing(val);',
              },
              {
                type: 'add',
                add: true,
                ln: 39,
                content: '+  }',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 32,
                ln2: 40,
                content: ' }',
              },
            ],
            oldStart: 29,
            oldLines: 4,
            newStart: 29,
            newLines: 12,
          },
        ],
        deletions: 0,
        additions: 8,
        from: 'src/app/core/settings/settings.component.ts',
        to: 'src/app/core/settings/settings.component.ts',
        index: ['17fba5e..4bfd2a8', '100644'],
      },
      {
        chunks: [
          {
            content: '@@ -1,12 +1,12 @@',
            changes: [
              {
                type: 'del',
                del: true,
                ln: 1,
                content: '-<div>',
              },
              {
                type: 'add',
                add: true,
                ln: 1,
                content: "+<div [ngStyle]=\"{'margin-bottom': settings.listSpacing+'px'}\">",
              },
              {
                type: 'normal',
                normal: true,
                ln1: 2,
                ln2: 2,
                content: '   <p *ngIf="hasUrl">',
              },
              {
                type: 'del',
                del: true,
                ln: 3,
                content: '-    <a class="title" href="{{item.url}}" [attr.target]="settings.openLinkInNewTab ? \'_blank\' : null" [attr.rel]="settings.openLinkInNewTab ? \'noopener\' : null">',
              },
              {
                type: 'add',
                add: true,
                ln: 3,
                content: '+    <a class="title" [ngStyle]="{\'font-size\': settings.titleFontSize+\'px\'}" href="{{item.url}}" [attr.target]="settings.openLinkInNewTab ? \'_blank\' : null" [attr.rel]="settings.openLinkInNewTab ? \'noopener\' : null">',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 4,
                ln2: 4,
                content: '       {{item.title}}',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 5,
                ln2: 5,
                content: '     </a>',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 6,
                ln2: 6,
                content: '     <span *ngIf="item.domain" class="domain">({{item.domain}})</span>',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 7,
                ln2: 7,
                content: '   </p>',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 8,
                ln2: 8,
                content: '   <p *ngIf="!hasUrl">',
              },
              {
                type: 'del',
                del: true,
                ln: 9,
                content: '-    <a class="title" [routerLink]="[\'/item\', item.id]" routerLinkActive="active">',
              },
              {
                type: 'add',
                add: true,
                ln: 9,
                content: '+    <a class="title" [ngStyle]="{\'font-size\': settings.titleFontSize+\'px\'}" [routerLink]="[\'/item\', item.id]" routerLinkActive="active">',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 10,
                ln2: 10,
                content: '       {{item.title}}',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 11,
                ln2: 11,
                content: '     </a>',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 12,
                ln2: 12,
                content: '   </p>',
              },
            ],
            oldStart: 1,
            oldLines: 12,
            newStart: 1,
            newLines: 12,
          },
        ],
        deletions: 3,
        additions: 3,
        from: 'src/app/feeds/item/item.component.html',
        to: 'src/app/feeds/item/item.component.html',
        index: ['0ff5f64..1b11231', '100644'],
      },
      {
        chunks: [
          {
            content: '@@ -2,4 +2,6 @@ export interface Settings {',
            changes: [
              {
                type: 'normal',
                normal: true,
                ln1: 2,
                ln2: 2,
                content: '    showSettings: boolean;',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 3,
                ln2: 3,
                content: '    openLinkInNewTab: boolean;',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 4,
                ln2: 4,
                content: '    theme: string;',
              },
              {
                type: 'add',
                add: true,
                ln: 5,
                content: '+   titleFontSize: string;',
              },
              {
                type: 'add',
                add: true,
                ln: 6,
                content: '+   listSpacing: string;',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 5,
                ln2: 7,
                content: ' }',
              },
            ],
            oldStart: 2,
            oldLines: 4,
            newStart: 2,
            newLines: 6,
          },
        ],
        deletions: 0,
        additions: 2,
        from: 'src/app/shared/models/settings.ts',
        to: 'src/app/shared/models/settings.ts',
        index: ['174948d..8a0f3ea', '100644'],
      },
      {
        chunks: [
          {
            content: '@@ -7,7 +7,9 @@ export class SettingsService {',
            changes: [
              {
                type: 'normal',
                normal: true,
                ln1: 7,
                ln2: 7,
                content: '   settings: Settings = {',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 8,
                ln2: 8,
                content: '     showSettings : false,',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 9,
                ln2: 9,
                content: '     openLinkInNewTab: localStorage.getItem("openLinkInNewTab") ? JSON.parse(localStorage.getItem("openLinkInNewTab")) : false,',
              },
              {
                type: 'del',
                del: true,
                ln: 10,
                content: '-    theme: localStorage.getItem("theme") ? localStorage.getItem("theme") : \'default\'',
              },
              {
                type: 'add',
                add: true,
                ln: 10,
                content: '+    theme: localStorage.getItem("theme") ? localStorage.getItem("theme") : \'default\',',
              },
              {
                type: 'add',
                add: true,
                ln: 11,
                content: '+    titleFontSize: localStorage.getItem("titleFontSize") ? localStorage.getItem("titleFontSize") : \'16\',',
              },
              {
                type: 'add',
                add: true,
                ln: 12,
                content: '+    listSpacing: localStorage.getItem("listSpacing") ? localStorage.getItem("listSpacing") : \'0\',',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 11,
                ln2: 13,
                content: '   };',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 12,
                ln2: 14,
                content: ' ',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 13,
                ln2: 15,
                content: '   constructor() { }',
              },
            ],
            oldStart: 7,
            oldLines: 7,
            newStart: 7,
            newLines: 9,
          },
          {
            content: '@@ -25,4 +27,14 @@ export class SettingsService {',
            changes: [
              {
                type: 'normal',
                normal: true,
                ln1: 25,
                ln2: 27,
                content: '     this.settings.theme = theme;',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 26,
                ln2: 28,
                content: '     localStorage.setItem("theme", this.settings.theme);',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 27,
                ln2: 29,
                content: '   }',
              },
              {
                type: 'add',
                add: true,
                ln: 30,
                content: '+',
              },
              {
                type: 'add',
                add: true,
                ln: 31,
                content: '+  setFont(fontSize){',
              },
              {
                type: 'add',
                add: true,
                ln: 32,
                content: '+    this.settings.titleFontSize = fontSize;',
              },
              {
                type: 'add',
                add: true,
                ln: 33,
                content: '+    localStorage.setItem("titleFontSize", this.settings.titleFontSize);',
              },
              {
                type: 'add',
                add: true,
                ln: 34,
                content: '+  }',
              },
              {
                type: 'add',
                add: true,
                ln: 35,
                content: '+',
              },
              {
                type: 'add',
                add: true,
                ln: 36,
                content: '+  setSpacing(listSpace){',
              },
              {
                type: 'add',
                add: true,
                ln: 37,
                content: '+    this.settings.listSpacing = listSpace;',
              },
              {
                type: 'add',
                add: true,
                ln: 38,
                content: '+    localStorage.setItem("listSpacing", this.settings.listSpacing);',
              },
              {
                type: 'add',
                add: true,
                ln: 39,
                content: '+  }',
              },
              {
                type: 'normal',
                normal: true,
                ln1: 28,
                ln2: 40,
                content: ' }',
              },
            ],
            oldStart: 25,
            oldLines: 4,
            newStart: 27,
            newLines: 14,
          },
        ],
        deletions: 1,
        additions: 13,
        from: 'src/app/shared/services/settings.service.ts',
        to: 'src/app/shared/services/settings.service.ts',
        index: ['f8a3869..f58517f', '100644'],
      },
    ];

    console.log(files);

    files.forEach(function(file) {
      console.log(file.chunks.length); // number of hunks
      console.log(file.chunks[0].changes.length); // hunk added/deleted/context lines
      // each item in changes is a string
      console.log(file.deletions); // number of deletions in the patch
      console.log(file.additions); // number of additions in the patch
    });
  }

  renderItem = ({item, i}) => {
    var chunks = item.chunks.map(function(chunk, i) {
      return <ListItem key={i} title={chunk.content} hideChevron />;
    });

    return (
      <Card
        key={i}
        containerStyle={{padding: 0}}
        title={item.from}>
        {chunks}
      </Card>
    );
  };

  render() {
    const {navigation} = this.props;
    const filesChanged = Parse(navigation.state.params.diff);

    return (
      <ViewContainer>
        <FlatList
          data={filesChanged}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </ViewContainer>
    );

    // return (
    //   <ViewContainer>
    //     <Text>{navigation.state.params.diff}</Text>
    //
    //     {filesChanged.map((file, i) => (
    //       <Card key={i} containerStyle={{padding: 0}}>
    //       {
    //         file.chunks.map((chunk, i) => (
    //             <ListItem
    //               key={i}
    //               title={chunk.name} />
    //
    //               {
    //                 chunk.changes.map((change, i) => (
    //                   <ListItem
    //                    key={i}
    //                    title={`Content: ${change.content}, Type: ${change.type}`} />
    //                 ))
    //               }
    //           ))
    //        }
    //       </Card>
    //       ))}
    //   </ViewContainer>
    // )
  }

  keyExtractor = item => {
    return item.id;
  };
}

PullDiff.propTypes = {
  diff: PropTypes.string,
};

export default PullDiff;
