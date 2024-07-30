import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { addApartmentToFirestore } from "../firebase/utils";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
  title: z.string({ message: "Please, enter a title" }),
  price: z.number({ message: "Please enter a price" }),
  description: z.string().min(10, {
    message: "Please enter a description greater than 50 characters",
  }),
  location: z.string({ message: "Enter location" }),
  type: z.string({ required_error: "Please select a type" }),
  rating: z.string({ message: "Select a rating" }),
  number_of_rooms: z.string({ message: "Please select number of rooms" }),
  agent_fee: z.string({ message: "Please, enter agent's fee" }),
  media: z.any({ message: "Please select at least one image" }),
  has_water: z.boolean(),
  has_light: z.boolean(),
  lease_term: z.number(),
  landlord_name: z.string(),
  landlord_phone_number: z.string(),
});

const CreateApartmentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      has_light: false,
      has_water: false,
    },
  });
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: addApartmentToFirestore,
    onSuccess: () => {
      navigate(-1);
      toast({ title: "Apartment added to firebase like a breeze" });
    },
    onError: (err) => console.error(err),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a short title for this apartment"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => onChange(parseInt(e.target.value))}
                  placeholder="Enter the apartment's price per year excluding agent's fee"
                  {...rest}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a little description about the apartment"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Briefly describe the location of this place"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What kind of apartment is this?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="single-room">Single Room</SelectItem>
                  <SelectItem value="self-contain">Self Contained</SelectItem>
                  <SelectItem value="one-bedroom">One-bedroom Flat</SelectItem>
                  <SelectItem value="two-bedroom">Two-bedroom Flat</SelectItem>
                  <SelectItem value="three-bedroom">
                    Three-bedroom Flat
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agent_fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent's Fee</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the agent's fee"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="How would you rate this apartment from 1 to five?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number_of_rooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of rooms</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="How many rooms are there?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="media"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Select Images</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  multiple
                  placeholder="Images and Videos"
                  type="file"
                  accept="image/*,video/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="has_water"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>This apartment has water</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="has_light"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>This apartment has light</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lease_term"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>Lease Term</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => onChange(parseInt(e.target.value))}
                  placeholder="Enter a lease term between one to five"
                  {...rest}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="landlord_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landlord's name</FormLabel>
              <FormControl>
                <Input
                  placeholder="The name of the landlord of the apartment"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="landlord_phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landlord's Phone number</FormLabel>
              <FormControl>
                <Input
                  placeholder="The phone number of the landlord of the apartment"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Submit
        </Button>
      </form>
    </Form>
  );
};
export default CreateApartmentForm;
