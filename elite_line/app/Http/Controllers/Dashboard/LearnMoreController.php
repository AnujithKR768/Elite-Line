<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\LearnMore;
use Illuminate\Support\Facades\Storage;

class LearnMoreController extends Controller
{
    public function learnMore()
    {
        $learnmores = LearnMore::orderBy('id','asc') -> paginate(5);
        return Inertia::render('Home/LearnMore/Index',[
            'learnmores' => $learnmores
        ]);
    }

    public function create()
    {
        return Inertia::render('Home/LearnMore/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('learn-more', 'public');
        }

        LearnMore::create([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'description' => $request->description,
            'location' => $request->location,
            'phone' => $request->phone,
            'email' => $request->email,
            'image' => $imagePath,
        ]);

        return redirect()->route('learn-more')->with('success', 'Learn More entry created successfully');
    }

    public function edit($id)
    {
        $learnmore = LearnMore::findOrFail($id);
        return Inertia::render('Home/LearnMore/Edit', [
            'learnmore' => $learnmore
        ]);
    }
    public function update(Request $request, $id)
    {
        $learnmore = LearnMore::findOrFail($id);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // If new image uploaded
        if ($request->hasFile('image')) {

            // delete old image safely
            if ($learnmore->image && Storage::disk('public')->exists($learnmore->image)) {
                Storage::disk('public')->delete($learnmore->image);
            }

            $data['image'] = $request->file('image')->store('learn-more', 'public');

        } else {
            // DO NOT overwrite image
            unset($data['image']);
        }

        $learnmore->update($data);

        return redirect()->route('learn-more')
            ->with('success', 'Learn More entry updated successfully');
    }

    public function destroy($id)
    {
        $learnmore = LearnMore::findOrFail($id);

        if ($learnmore->image) {
            Storage::disk('public')->delete($learnmore->image);
        }

        $learnmore->delete();

        return redirect()->route('learn-more')->with('success', 'Learn More entry deleted successfully');
    }

}
