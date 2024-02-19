// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use libloading::{Library, Symbol};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn call_cpp(a: i32 , b:i32) -> Result<i32, String> {
    let lib = unsafe { Library::new("cppDll.dll")}.map_err(|e| e.to_string())?;
    type MyFunction = unsafe extern "C" fn(i32,i32) -> i32;
    unsafe {
        let my_function: Symbol<MyFunction> = lib.get(b"addNumbers").map_err(|e| e.to_string())?;
        Ok(my_function(a,b))
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![call_cpp])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}