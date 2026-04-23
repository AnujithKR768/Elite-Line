<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MissionVision;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class MissionVisionController extends Controller
{
    // INDEX
    public function index()
    {
        return Inertia::render('about/missionvision/index', [
            'missions' => MissionVision::where('type', 'mission')->paginate(5),
            'visions' => MissionVision::where('type', 'vision')->paginate(5),
        ]);
    }

    //  CREATE PAGE
    public function create()
    {
        return Inertia::render('about/missionvision/create');
    }

    //  STORE
    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|in:mission,vision',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // Upload image
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('mission_vision', 'public');
        }

        MissionVision::create($data);

        return redirect()->route('mission-vision')
            ->with('success', 'Saved successfully');
    }

    //  EDIT
    public function edit($id)
    {
        return Inertia::render('about/missionvision/edit', [
            'item' => MissionVision::findOrFail($id)
        ]);
    }

    //  UPDATE (FIXED IMAGE ISSUE)
    public function update(Request $request, $id)
    {
        $item = MissionVision::findOrFail($id);

        $data = $request->validate([
            'type' => 'required|in:mission,vision',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // If new image uploaded
        if ($request->hasFile('image')) {

            // delete old image safely
            if ($item->image && Storage::disk('public')->exists($item->image)) {
                Storage::disk('public')->delete($item->image);
            }

            $data['image'] = $request->file('image')->store('mission_vision', 'public');

        } else {
            //  DO NOT overwrite image
            unset($data['image']);
        }

        $item->update($data);

        return redirect()->route('mission-vision')
            ->with('success', 'Updated successfully');
    }

    //  DELETE
    public function destroy($id)
    {
        $item = MissionVision::findOrFail($id);

        // delete image
        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return back()->with('success', 'Deleted successfully');
    }
}
