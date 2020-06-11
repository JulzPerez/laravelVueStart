<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class RunCodeController extends Controller
{
    //    
    public function runCode(Request $request){
/*
        $process = new Process('C:\Users\Julz\Desktop\test\test.exe');
        $process->run();

        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        echo $process->getOutput();   
*/
    }   
}
