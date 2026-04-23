<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Philosophy;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PhilosophyController extends Controller
{
    public function index()
    {
        $philosophies = Philosophy::orderBy('id','asc') -> paginate(5);
        return Inertia::render('Home/KnowMore/OurPhilosophy/Index',[
            'philosophies' => $philosophies
        ]);
    }



    public function create()
    {
        return Inertia::render('Home/KnowMore/OurPhilosophy/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'title' => 'required|string|max:255',
            'paragraph' => 'required|string',
            'paragraph2' => 'required|string',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('our-philosophy', 'public');
        }

        Philosophy::create([
            'image' => $imagePath,
            'title' => $request->title,
            'paragraph' => $request->paragraph,
            'paragraph2' => $request->paragraph2,
        ]);

        return redirect()->route('Philosophy')->with('success', 'Philosophy created successfully');
    }

    public function edit($id)
    {
        $philosophy = Philosophy::findOrFail($id);
        return Inertia::render('Home/KnowMore/OurPhilosophy/Edit', [
            'philosophy' => $philosophy
        ]);
    }

    public function update(Request $request, $id)
    {
        $philosophy = Philosophy::findOrFail($id);

        $data = $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'title' => 'required|string|max:255',
            'paragraph' => 'required|string',
            'paragraph2' => 'required|string',
        ]);

        // If new image uploaded
        if ($request->hasFile('image')) {

            // delete old image safely
            if ($philosophy->image && Storage::disk('public')->exists($philosophy->image)) {
                Storage::disk('public')->delete($philosophy->image);
            }

            $data['image'] = $request->file('image')->store('our-philosophy', 'public');

        } else {
            // DO NOT overwrite image
            unset($data['image']);
        }

        $philosophy->update($data);

        return redirect()->route('Philosophy')
            ->with('success', 'Philosophy updated successfully');
    }

    public function destroy($id)
    {
        $philosophy = Philosophy::findOrFail($id);
        $philosophy->delete();

        return redirect()->back()->with('success', 'Philosophy deleted successfully');
    }
}

