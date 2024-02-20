// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use libloading::{Library, Symbol};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet() -> String {
    format!("Hello! You've been greeted from Rust!")
}

#[tauri::command]
fn call_cpp(a: i32, b: i32) -> Result<i32, i32> {
    let lib = unsafe { Library::new("C:\\Users\\97254\\Documents\\CalibrationProject\\CalibrationApp\\src-tauri\\src\\adderDll.dll") }.map_err(|_| -1)?;
    type MyFunction = unsafe extern "C" fn(i32, i32) -> i32;
    let my_function: Symbol<MyFunction> = unsafe { lib.get(b"add") }.map_err(|_| -1)?;
    Ok(unsafe { my_function(a, b) })
}
#[tauri::command]
fn call_cs(a: i32, b: i32) -> Result<f32,f32> {
    let lib = unsafe { Library::new("C:\\Users\\97254\\Documents\\CalibrationProject\\CalibrationApp\\src-tauri\\src\\multiDll.dll") }.map_err(|_| -1.5)?;
    type MyFunction = unsafe extern fn(a:i32, b:i32) -> f32;
    let my_function: Symbol<MyFunction> = unsafe { lib.get(b"multiply") }.map_err(|_| -1.0)?;
    Ok(unsafe { my_function(a, b) })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, call_cpp, call_cs])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
