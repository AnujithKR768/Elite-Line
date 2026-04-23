<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Header;
use Illuminate\Support\Facades\Storage;

class HeaderController extends Controller
{
    public function index()
    {
        $headers = Header::orderBy('id','asc')->paginate(5);

        return Inertia::render('Home/Header/Index',[
            'headers' => $headers
        ]);
    }

    // Store data

    public function create()
    {
        return Inertia::render('Home/Header/Create');
    }

   public function store(Request $request)
    {
        $request->validate([
            "image" => "nullable|image|mimes:jpg,jpeg,png,webp|max:10240",
            "title" => "required|string|max:255",
            "subtitle" => "required|string|max:255"
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('header', 'public');
        }

        Header::create([
            'image' => $imagePath,
            'title' => $request->title,
            'subtitle' => $request->subtitle
        ]);

        return redirect()->route('Header');
    }

    public function edit($id)
    {
        $header = Header::findOrFail($id);

        return Inertia::render('Home/Header/Edit', [
            'header' => $header
        ]);
    }

   public function update(Request $request, $id)
    {
        $header = Header::findOrFail($id);

        $data = $request->validate([
            "image" => "nullable|image|mimes:jpg,jpeg,png,webp|max:10240",
            "title" => "required|string|max:255",
            "subtitle" => "required|string|max:255"
        ]);

        // If new image uploaded
        if ($request->hasFile('image')) {

            // delete old image
            if ($header->image && Storage::disk('public')->exists($header->image)) {
                Storage::disk('public')->delete($header->image);
            }

            $data['image'] = $request->file('image')->store('header', 'public');

        } else {
            //  Keep old image (BEST PRACTICE)
            unset($data['image']);
        }

        $header->update($data);

        return redirect()->route('Header')
            ->with('success', 'Header updated successfully.');
    }

    public function destroy($id)
    {
        $header = Header::findOrFail($id);
        $header->delete();

        return redirect()->route('Header')
            ->with('success', 'Header deleted successfully.');
    }
}
