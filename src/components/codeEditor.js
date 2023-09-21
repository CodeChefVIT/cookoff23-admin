import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from '@uiw/codemirror-extensions-langs';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import "@uiw/codemirror-extensions-langs"


export default function codeEditor(code,lang) {
  switch(lang){
    case 71:
      return (
        <div className="">
          <CodeMirror value={code} height="100px" theme={vscodeDark} readOnly={true} extensions={[langs.python()]}/>
        </div>
      );

      case 50:
      return (
        <div className="">
          <CodeMirror value={code} height="100px" theme={vscodeDark} readOnly={true} extensions={[langs.c()]}/>
        </div>
      );

      case 54:
      return (
        <div className="">
          <CodeMirror value={code} height="100px" theme={vscodeDark} readOnly={true} extensions={[langs.cpp()]}/>
        </div>
      );

      case 63:
      return (
        <div className="">
          <CodeMirror value={code} height="100px" theme={vscodeDark} readOnly={true} extensions={[langs.javascript()]}/>
        </div>
      );

      case 62:
      return (
        <div className="">
          <CodeMirror value={code} height="100px" theme={vscodeDark} readOnly={true} extensions={[langs.java()]}/>
        </div>
      );

      case 73:
      return (
        <div className="">
          <CodeMirror value={code} height="100px" theme={vscodeDark} readOnly={true} extensions={[langs.rust()]}/>
        </div>
      );

  }
}
