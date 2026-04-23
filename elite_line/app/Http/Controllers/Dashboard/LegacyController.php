<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Legacy;
use Inertia\Inertia;

class LegacyController extends Controller
{
    public function index()
    {
        $legacy = Legacy::orderBy('id','asc') -> paginate(5);
        return Inertia::render('Home/KnowMore/Legacy/Index',[
            'legacy' => $legacy
        ]);
    }

    public function create()
    {
        return Inertia::render('Home/KnowMore/Legacy/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'paragraph' => 'required|string',
            'paragraph2' => 'required|string',
        ]);

        Legacy::create([
            'title' => $request->title,
            'paragraph' => $request->paragraph,
            'paragraph2' => $request->paragraph2,
        ]);

        return redirect()->route('Legacy')->with('success', 'Legacy created successfully');
    }

    public function edit($id)
    {
        $legacy = Legacy::findOrFail($id);
        return Inertia::render('Home/KnowMore/Legacy/Edit', [
            'legacy' => $legacy
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'paragraph' => 'required|string',
            'paragraph2' => 'required|string',
        ]);

        $legacy = Legacy::findOrFail($id);
        $legacy->update([
            'title' => $request->title,
            'paragraph' => $request->paragraph,
            'paragraph2' => $request->paragraph2,
        ]);

        return redirect()->route('Legacy')->with('success', 'Legacy updated successfully');
    }

    public function destroy($id)
    {
        $legacy = Legacy::findOrFail($id);
        $legacy->delete();

        return redirect()->back()->with('success', 'Legacy deleted successfully');
    }

}
